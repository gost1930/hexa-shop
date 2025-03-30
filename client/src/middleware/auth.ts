const checkAuth = async () => {
  try {
      const response = await fetch("http://localhost:3001/api/v1/user/virifyToken", {
          method: "POST",
          credentials: "include",   
      });

      const data = await response.json();

      return data.authenticated ?? false;
  } catch (error) {
      console.error("Error in checkAuth:", error);
      return false;
  }
};

export default checkAuth;
