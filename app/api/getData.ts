export const mainUrl = 'https://cars-app-production.up.railway.app';
// export const mainUrl = 'http://127.0.0.1:1337';

export const getCartData = async () => {
  const res = await fetch(`${mainUrl}/api/carts?populate=*`, {
    next: {
      revalidate: 0,
    }
  });
  return await res.json();
}

export const getReservationData = async () => {
  const res = await fetch(`${mainUrl}/api/reservations?populate=*`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to fetch reservations data');
  const reservationData = await res.json();

  const reservationsWithDealers = await Promise.all(
    reservationData.data.map(async (reservation: any) => {
      const dealer = await getDealerById(reservation.attributes.dealer);
      return {
        ...reservation,
        dealer,
      };
    })
  );

  return { data: reservationsWithDealers };
};

export const getUserReservationData = async (userEmail: any) => {
  const res = await fetch(`${mainUrl}/api/reservations?[filters][email][$eq]=${userEmail}&populate=*`, {
    next: {
      revalidate: 0,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch reservations data');
  const reservationData = await res.json();

  const reservationsWithDealers = await Promise.all(
    reservationData.data.map(async (reservation: any) => {
      const dealer = await getDealerById(reservation.attributes.dealer);
      return {
        ...reservation,
        dealer,
      };
    })
  );

  return { data: reservationsWithDealers };
}

export const getProducts = async () => {
  const res = await fetch(`${mainUrl}/api/products?populate=*`, {
    next: {
      revalidate: 0,
    },
  });

  const products = await res.json();

  return products;
};

export const getCars = async (page: number) => {
  const res = await fetch(`${mainUrl}/api/cars?populate=*&pagination[page]=${page}&pagination[pageSize]=9`, {
    next: {
      revalidate: 0,
    },
  });
  return await res.json();
};

export const getShoes = async () => {
  const res = await fetch(`${mainUrl}/api/shoes?populate=*`, {
    next: {
      revalidate: 0,
    },
  });

  const shoes = await res.json();

  return shoes;
}

export const getDealers = async () => {
  const res = await fetch(`${mainUrl}/api/dealers?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

export const getDealerById = async (dealerId: string) => {
  try {
    const res = await fetch(`${mainUrl}/api/dealers/${dealerId}?populate=*`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching dealer:', error);
    return null;
  }
};

export const getUserCartProducts = async () => {
  const res = await fetch(`${mainUrl}/api/carts?populate=*`, {
    next: {
      revalidate: 0,
    },
  });
  return await res.json();
};

export const getProdData = async ({params}: {params:any}) => {
  const res = await fetch(`${mainUrl}/api/products/${params.id}?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

export const getCarData = async (id: string) => {
  const res = await fetch(`${mainUrl}/api/cars/${id}?populate=*`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to fetch car data');
  return await res.json();
};

export const getShoeData = async ({params}: {params:any}) => {
  const res = await fetch(`${mainUrl}/api/shoes/${params.id}?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

