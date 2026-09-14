export const cityCoordinates = {
    "Chennai": { lat: 13.0827, lng: 80.2707 },
    "Bengaluru": { lat: 12.9716, lng: 77.5946 },
    "Mumbai": { lat: 19.0760, lng: 72.8777 },
    "Coimbatore": { lat: 11.0168, lng: 76.9558 },
    "Hyderabad": { lat: 17.3850, lng: 78.4867 }
};

export const theatresByCity = {
    "Chennai": [
        {
            id: 1,
            name: "PVR Cinemas (Grand Galada)",
            city: "Chennai",
            address: "Pallavaram, Chennai",
            lat: 12.9801,
            lng: 80.1634,
            rating: 4.5,
            features: ["Dolby Atmos", "4K Projection", "Recliners"],
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
            availableMovies: [
                { title: "Vaa Vaathiyaar", time: "10:00 AM", lang: "Tamil" },
                { title: "Jailer 2", time: "2:00 PM", lang: "Tamil" },
                { title: "Suriya 46", time: "6:00 PM", lang: "Tamil" }
            ],
            shows: ["10:00 AM", "01:30 PM", "05:00 PM", "09:30 PM"]
        },
        {
            id: 2,
            name: "Vettri Theatres",
            city: "Chennai",
            address: "Chromepet, Chennai",
            lat: 12.9647,
            lng: 80.1460,
            rating: 4.8,
            features: ["RGB Laser", "Dolby 7.1", "Tasty Snacks"],
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
            availableMovies: [
                { title: "Thalaivar Thambi Thalaimaiyil", time: "11:00 AM", lang: "Tamil" },
                { title: "Parasakthi", time: "2:30 PM", lang: "Tamil" },
                { title: "Vaa Vaathiyaar", time: "6:30 PM", lang: "Tamil" }
            ],
            shows: ["11:00 AM", "02:30 PM", "06:30 PM", "10:15 PM"]
        },
        {
            id: 3,
            name: "AGS Cinemas",
            city: "Chennai",
            address: "T. Nagar, Chennai",
            lat: 13.0425,
            lng: 80.2295,
            rating: 4.3,
            features: ["Couple Seats", "Food Court", "Parking"],
            image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=1779&auto=format&fit=crop",
            availableMovies: [
                { title: "Suriya 46", time: "9:30 AM", lang: "Tamil" },
                { title: "Jailer 2", time: "1:00 PM", lang: "Tamil" },
                { title: "Parasakthi", time: "10:00 PM", lang: "Tamil" }
            ],
            shows: ["09:30 AM", "01:00 PM", "04:30 PM", "08:00 PM"]
        },
        {
            id: 4,
            name: "Rohini Silver Screens",
            city: "Chennai",
            address: "Koyambedu, Chennai",
            lat: 13.0732,
            lng: 80.1932,
            rating: 4.6,
            features: ["Fans Fort", "Mass Experience", "4K"],
            image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
            availableMovies: [
                { title: "Vaa Vaathiyaar", time: "4:00 AM FDFS", lang: "Tamil" },
                { title: "Thalaivar Thambi Thalaimaiyil", time: "8:00 AM", lang: "Tamil" },
                { title: "Jailer 2", time: "12:00 PM", lang: "Tamil" }
            ],
            shows: ["08:00 AM", "12:00 PM", "04:00 PM", "07:30 PM"]
        }
    ],

    "Bengaluru": [
        {
            id: 101,
            name: "PVR Forum Mall",
            city: "Bengaluru",
            address: "Koramangala, Bengaluru",
            lat: 12.9346,
            lng: 77.6112,
            rating: 4.7,
            features: ["IMAX 3D", "Dolby Atmos", "Gold Class"],
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
            availableMovies: [
                { title: "Jailer 2", time: "10:30 AM", lang: "Kannada / Tamil" },
                { title: "Mission: Impossible", time: "2:15 PM", lang: "English" },
                { title: "A Minecraft Movie", time: "6:45 PM", lang: "English" }
            ],
            shows: ["10:30 AM", "02:15 PM", "06:45 PM", "10:00 PM"]
        },
        {
            id: 102,
            name: "INOX Lido Mall",
            city: "Bengaluru",
            address: "MG Road, Bengaluru",
            lat: 12.9754,
            lng: 77.6200,
            rating: 4.4,
            features: ["MX4D", "Recliners", "Gourmet Menu"],
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
            availableMovies: [
                { title: "Vaa Vaathiyaar", time: "11:15 AM", lang: "Tamil" },
                { title: "Thunderbolts*", time: "3:00 PM", lang: "English" }
            ],
            shows: ["11:15 AM", "03:00 PM", "07:00 PM"]
        },
        {
            id: 103,
            name: "Cinepolis Royal Meenakshi",
            city: "Bengaluru",
            address: "Bannerghatta Road, Bengaluru",
            lat: 12.8763,
            lng: 77.5957,
            rating: 4.5,
            features: ["VIP Lounge", "Dolby 7.1"],
            image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=1779&auto=format&fit=crop",
            availableMovies: [
                { title: "Parasakthi", time: "12:00 PM", lang: "Tamil" },
                { title: "Suriya 46", time: "4:30 PM", lang: "Tamil" }
            ],
            shows: ["12:00 PM", "04:30 PM", "08:30 PM"]
        }
    ],

    "Mumbai": [
        {
            id: 201,
            name: "PVR ICON Phoenix Lower Parel",
            city: "Mumbai",
            address: "Lower Parel, Mumbai",
            lat: 18.9950,
            lng: 72.8242,
            rating: 4.9,
            features: ["IMAX Laser", "Play House", "LUXE Recliners"],
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
            availableMovies: [
                { title: "A Minecraft Movie", time: "11:00 AM", lang: "English / Hindi" },
                { title: "Thunderbolts*", time: "2:45 PM", lang: "English" },
                { title: "Mission: Impossible", time: "7:00 PM", lang: "English" }
            ],
            shows: ["11:00 AM", "02:45 PM", "07:00 PM", "10:30 PM"]
        },
        {
            id: 202,
            name: "INOX Leisure Nariman Point",
            city: "Mumbai",
            address: "Nariman Point, Mumbai",
            lat: 18.9256,
            lng: 72.8242,
            rating: 4.6,
            features: ["Sea View Lounge", "In-seat Dining"],
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
            availableMovies: [
                { title: "Until Dawn", time: "1:30 PM", lang: "English" },
                { title: "Havoc", time: "5:30 PM", lang: "English" }
            ],
            shows: ["01:30 PM", "05:30 PM", "09:00 PM"]
        }
    ],

    "Coimbatore": [
        {
            id: 301,
            name: "KG Cinemas",
            city: "Coimbatore",
            address: "Race Course, Coimbatore",
            lat: 11.0015,
            lng: 76.9640,
            rating: 4.6,
            features: ["4K Projection", "Dolby Atmos", "Large Screen"],
            image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=1779&auto=format&fit=crop",
            availableMovies: [
                { title: "Vaa Vaathiyaar", time: "10:15 AM", lang: "Tamil" },
                { title: "Jailer 2", time: "2:15 PM", lang: "Tamil" },
                { title: "Parasakthi", time: "6:15 PM", lang: "Tamil" }
            ],
            shows: ["10:15 AM", "02:15 PM", "06:15 PM", "10:00 PM"]
        },
        {
            id: 302,
            name: "Broadway Cinemas (Prozone Mall)",
            city: "Coimbatore",
            address: "Saravanampatti, Coimbatore",
            lat: 11.0550,
            lng: 76.9950,
            rating: 4.7,
            features: ["EPIQ Screen", "Gold Class", "Dolby Atmos"],
            image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
            availableMovies: [
                { title: "Suriya 46", time: "11:00 AM", lang: "Tamil" },
                { title: "Thalaivar Thambi Thalaimaiyil", time: "3:30 PM", lang: "Tamil" }
            ],
            shows: ["11:00 AM", "03:30 PM", "07:45 PM"]
        }
    ],

    "Hyderabad": [
        {
            id: 401,
            name: "AMB Cinemas",
            city: "Hyderabad",
            address: "Gachibowli, Hyderabad",
            lat: 17.4435,
            lng: 78.3653,
            rating: 4.9,
            features: ["Superplex", "M-VIP Recliners", "Dolby Atmos"],
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
            availableMovies: [
                { title: "Jailer 2", time: "11:00 AM", lang: "Telugu / Tamil" },
                { title: "Thunderbolts*", time: "3:15 PM", lang: "English / Telugu" },
                { title: "Mission: Impossible", time: "7:30 PM", lang: "English" }
            ],
            shows: ["11:00 AM", "03:15 PM", "07:30 PM", "11:00 PM"]
        },
        {
            id: 402,
            name: "Prasads Multiplex",
            city: "Hyderabad",
            address: "NTR Gardens, Hyderabad",
            lat: 17.4116,
            lng: 78.4682,
            rating: 4.8,
            features: ["Large Screen", "Gaming Zone", "Food Court"],
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
            availableMovies: [
                { title: "Vaa Vaathiyaar", time: "10:30 AM", lang: "Tamil" },
                { title: "Suriya 46", time: "2:00 PM", lang: "Telugu" }
            ],
            shows: ["10:30 AM", "02:00 PM", "06:00 PM", "09:30 PM"]
        }
    ]
};
