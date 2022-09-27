import { useEffect, useState } from "react";

export default function useScreenState() {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(undefined)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    return () => {
      setMounted(false)
    }
  }, [])

  return {
    isLoading,
    setLoading,
    error,
    setError,
    mounted,
    setMounted,
  }
}
