import { useState, useEffect } from "react";

function useEmailList() {
  const [isOnline, setIsOnline] = useState(null);

  

  return isOnline;
}

export default useEmailList;