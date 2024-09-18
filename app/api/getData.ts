export const getCartData = async () => {
  const res = await fetch(`http://127.0.0.1:1337/api/carts?populate=*`, {
    next: {
      revalidate: 0,
    }
  });
  return await res.json();
}

export const getReservationData = async () => {
  const res = await fetch(`http://127.0.0.1:1337/api/reservations?populate=*`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to fetch reservations data');
  const reservationData = await res.json();

  // Fetch dealer details for each reservation
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

export const getProducts = async () => {
  const res = await fetch(`http://127.0.0.1:1337/api/products?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

export const getCars = async (page: number) => {
  const res = await fetch(`http://127.0.0.1:1337/api/cars?populate=*&pagination[page]=${page}&pagination[pageSize]=9`, {
    next: {
      revalidate: 0,
    },
  });
  return await res.json();
};

export const getShoes = async () => {
  const res = await fetch(`http://127.0.0.1:1337/api/shoes?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

export const getDealers = async () => {
  const res = await fetch(`http://127.0.0.1:1337/api/dealers?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

export const getDealerById = async (dealerId: string) => {
  const res = await fetch(`http://127.0.0.1:1337/api/dealers/${dealerId}?populate=*`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to fetch dealer data');
  return await res.json();
};

export const getUserCartProducts = async () => {
  const res = await fetch(`http://127.0.0.1:1337/api/carts?populate=*`, {
    next: {
      revalidate: 0,
    },
  });
  return await res.json();
};

export const getProdData = async ({params}: {params:any}) => {
  const res = await fetch(`http://127.0.0.1:1337/api/products/${params.id}?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

export const getCarData = async (id: string) => {
  const res = await fetch(`http://127.0.0.1:1337/api/cars/${id}?populate=*`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to fetch car data');
  return await res.json();
};

export const getShoeData = async ({params}: {params:any}) => {
  const res = await fetch(`http://127.0.0.1:1337/api/shoes/${params.id}?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}