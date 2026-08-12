import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import statsService from "../services/statsService";

export default function useDashboardStats() {
  const { token } = useContext(ShopContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!token) {
      setStats(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await statsService.getDashboardStats();
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [token]);

  return { stats, loading, refresh };
}
