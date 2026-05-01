import { useState, useEffect } from 'react';

export function useClocks() {
  const [myTime, setMyTime] = useState<string>('--:--:--');
  const [visitorTime, setVisitorTime] = useState<string>('--:--:--');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      // VET is UTC-4
      const optionsVE = { timeZone: 'America/Caracas', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' } as const;
      setMyTime(now.toLocaleTimeString('es-VE', optionsVE));
      
      const optionsLocal = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' } as const;
      setVisitorTime(now.toLocaleTimeString(undefined, optionsLocal));
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return { myTime, visitorTime };
}

export function useWeather() {
  const [temp, setTemp] = useState<string>('--°C');
  const [icon, setIcon] = useState<string>('bi-cloud');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=10.2469&longitude=-67.5958&current_weather=true');
        if (res.ok) {
          const data = await res.json();
          const t = Math.round(data.current_weather.temperature);
          setTemp(`${t}°C`);
          setIcon(t > 25 ? 'bi-sun-fill text-dracula-yellow' : 'bi-cloud-sun-fill text-dracula-yellow');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // 10 mins
    return () => clearInterval(interval);
  }, []);

  return { temp, icon };
}

export function useVisitorStats() {
  const [country, setCountry] = useState<string>('Local');
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    // Local country detection (basic IP fetch)
    fetch('https://api.db-ip.com/v2/free/self')
      .then(r => r.json())
      .then(d => {
        if (d && d.countryCode) {
          setCountry(d.countryCode);
        }
      })
      .catch(() => {});

    // Hybrid Visitor logic
    const BASE_VISITS = 1250;
    const START_DATE = new Date('2024-01-01').getTime();
    const VISITS_PER_DAY = 5;

    let localVisits = parseInt(localStorage.getItem('localVisits') || '0');
    if (!sessionStorage.getItem('visited')) {
      localVisits++;
      localStorage.setItem('localVisits', localVisits.toString());
      sessionStorage.setItem('visited', 'true');
    }

    const calculateTotal = () => {
      const now = new Date().getTime();
      const daysPassed = (now - START_DATE) / (1000 * 60 * 60 * 24);
      const simulated = Math.floor(daysPassed * VISITS_PER_DAY);
      setVisits(BASE_VISITS + simulated + localVisits);
    };

    calculateTotal();
  }, []);

  return { country, visits };
}
