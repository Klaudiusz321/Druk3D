declare global {
    // Definiujemy globalną zmienną mongoose, która przechowuje obiekt z połączeniem i promisem.
    // Możesz dostosować typy, aby odpowiadały Twojemu przypadkowi użycia.
    // Tutaj przyjmujemy, że conn to dowolny typ (możesz zastąpić "any" odpowiednią wartością) oraz promise to Promise<any> lub null.
    var mongoose: {
      conn: any;
      promise: Promise<any> | null;
    };
  }
  
  export {};
  