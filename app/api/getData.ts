export const getCartData = async () => {
  const res = await fetch(`https://cars-app-cfm9.onrender.com/api/carts?populate=*`, {
    next: {
      revalidate: 0,
    }
  });
  return await res.json();
}

export const getReservationData = async () => {
  const res = await fetch(`https://cars-app-cfm9.onrender.com/api/reservations?populate=*`, {
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
  const res = await fetch(`https://cars-app-cfm9.onrender.com/api/products?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

export const getCars = async (page: number) => {
  const res = await fetch(
    `https://cars-app-cfm9.onrender.com/api/cars?populate=*&pagination[page]=${page}&pagination[pageSize]=9`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch cars');
  }

  const data = await res.json();

  if (!data || !data.meta || !data.meta.pagination) {
    console.error('Pagination or data is missing');
    return {
      data: [],
      meta: {
        pagination: {
          total: 0,
        },
      },
    };
  }

  return data;
};

export const getShoes = async () => {
  const res = await fetch(`https://cars-app-cfm9.onrender.com/api/shoes?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

export const getDealers = async () => {
  const res = await fetch(`https://cars-app-cfm9.onrender.com/api/dealers?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

export const getDealerById = async (dealerId: string) => {
  const res = await fetch(`https://cars-app-cfm9.onrender.com/api/dealers/${dealerId}?populate=*`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to fetch dealer data');
  return await res.json();
};

export const getUserCartProducts = async () => {
  const res = await fetch(`https://cars-app-cfm9.onrender.com/api/carts?populate=*`, {
    next: {
      revalidate: 0,
    },
  });
  return await res.json();
};

export const getProdData = async ({params}: {params:any}) => {
  const res = await fetch(`https://cars-app-cfm9.onrender.com/api/products/${params.id}?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

export const getCarData = async (id: string) => {
  const res = await fetch(`https://cars-app-cfm9.onrender.com/api/cars/${id}?populate=*`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to fetch car data');
  return await res.json();
};

export const getShoeData = async ({params}: {params:any}) => {
  const res = await fetch(`https://cars-app-cfm9.onrender.com/api/shoes/${params.id}?populate=*`, {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}