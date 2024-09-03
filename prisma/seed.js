const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const deleteAllSearches = await prisma.search.deleteMany();
  console.log("DELETED ALL SEARCHES", deleteAllSearches);

  const searches = await prisma.search.createMany({
    data: [
      {
        destination: "barcelona",
        duration: 3,
        preferences: [],
        response: JSON.stringify([
          [
            {
              "activity name": "Walking Tour of Gothic Quarter",
              duration: "09:00-13:00",
              address: "Carrer de Fernández y González, 7, 08002 Barcelona,",
            },
            {
              "activity name": "Visit Sagrada Familia",
              duration: "13:00-17:00",
              address: "Carrer de Mallorca, 401, 08013 Barcelona,",
            },
            {
              "activity name": "Tibidabo Amusement Park",
              duration: "17:00-22:00",
              address: "Travessera de Dalt, s/n, 08035 Barcelona,",
            },
          ],
          [
            {
              "activity name": "FC Barcelona Guided Tour",
              duration: "09:00-13:00",
              address: "Avinguda Joan Gaspart, 77, 08018 Barcelona,",
            },
            {
              "activity name": "La Boqueria Market",
              duration: "13:00-17:00",
              address: "La Rambla, 91, 08002 Barcelona,",
            },
            {
              "activity name": "Picnic At Park de la Ciutadella",
              duration: "17:00-20:00",
              address: "Passeig de Pujades, 1, 08003 Barcelona,",
            },
          ],
          [
            {
              "activity name": "Barcelona Aquarium",
              duration: "10:00-13:00",
              address: "Moll d’Espanya del Port Vell, S/N, 08039 Barcelona,",
            },
            {
              "activity name": "Santa Maria del Mar Cathedral",
              duration: "13:00-17:00",
              address: "Plaça de Santa Maria, 1, 08003 Barcelona,",
            },
            {
              "activity name": "La Barceloneta Beach",
              duration: "17:00-22:00",
              address: "Moll de Gregal, 08003 Barcelona,",
            },
          ],
        ]),
      },
      {
        destination: "london",
        duration: 3,
        preferences: [],
        response: JSON.stringify([
          [
            {
              "activity name": "Visit Big Ben",
              duration: "07:00-09:00",
              address: "Elizabeth Tower, Westminster, London SW1A 0AA",
            },
            {
              "activity name": "Tour London Eye",
              duration: "10:00-13:00",
              address: "London Eye, Jubilee Gardens, London SE1 7PB",
            },
            {
              "activity name": "Visit the Tower of London",
              duration: "14:00-17:00",
              address: "St Katharine's & Wapping, London EC3N 4AB",
            },
          ],
          [
            {
              "activity name": "Visit the National Gallery",
              duration: "09:00-12:00",
              address: "Trafalgar Square, London WC2N 5DN",
            },
            {
              "activity name": "Go shopping at Oxford Street",
              duration: "13:00-16:00",
              address: "Oxford Street, Mayfair, London W1C 1DX",
            },
            {
              "activity name": "See a show in West End",
              duration: "17:00-22:00",
              address: "Covent Garden Piazza, London WC2E 8RF",
            },
          ],
          [
            {
              "activity name": "Visit Buckingham Palace",
              duration: "07:00-09:00",
              address: "Westminster, London SW1A 1AA",
            },
            {
              "activity name": "Go for a stroll at Hyde Park",
              duration: "10:00-13:00",
              address: "Hyde Park, London W2 2UH",
            },
            {
              "activity name": "Dine in Covent Garden",
              duration: "14:00-17:00",
              address: "Covent Garden, London WC2E 8RF",
            },
          ],
        ]),
      },
      {
        destination: "new york",
        duration: 3,
        preferences: [],
        response: JSON.stringify([
          [
            {
              "activity name": "Central Park",
              duration: "9:00-12:00",
              address: "Central Park, New York, NY 10022",
            },
            {
              "activity name": "Statue of Liberty",
              duration: "12:30-15:30",
              address: "Liberty Island, New York, NY 10004",
            },
            {
              "activity name": "Empire State Building",
              duration: "16:00-19:00",
              address: "20 W 34th St, New York, NY 10001",
            },
          ],
          [
            {
              "activity name": "Rockefeller Center",
              duration: "9:00-12:00",
              address: "45 Rockefeller Plz, New York, NY 10111",
            },
            {
              "activity name": "Chinatown",
              duration: "12:30-15:30",
              address: "Canal Street, New York, NY 10013",
            },
            {
              "activity name": "Broadway Show",
              duration: "16:00-19:00",
              address: "Broadway Ave, New York, NY 10036",
            },
          ],
          [
            {
              "activity name": "Brooklyn Bridge",
              duration: "9:00-12:00",
              address: "Brooklyn Bridge, New York, NY 10004",
            },
            {
              "activity name": "One World Observatory",
              duration: "12:30-15:30",
              address: "285 Fulton St, New York, NY 10007",
            },
            {
              "activity name": "Times Square",
              duration: "16:00-19:00",
              address: "Times Square, New York, NY 10036",
            },
          ],
        ]),
      },
      {
        destination: "paris",
        duration: 4,
        preferences: [],
        response: JSON.stringify([
          [
            {
              "activity name": "Eiffel Tower Visit",
              duration: "09:00-12:00",
              address:
                "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
            },
            {
              "activity name": "Louvre Museum",
              duration: "13:00-16:00",
              address: "Rue de Rivoli, 75001 Paris, France",
            },
            {
              "activity name": "Walk along the Seine",
              duration: "17:00-19:00",
              address: "Voie Georges Pompidou, 75004 Paris, France",
            },
          ],
          [
            {
              "activity name": "Notre-Dame Cathedral visit",
              duration: "09:00-12:00",
              address:
                "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France",
            },
            {
              "activity name": "Lunch in the Latin Quarter",
              duration: "12:30-14:30",
              address: "Latin Quarter, 75005 Paris, France",
            },
            {
              "activity name": "Visit Montmartre",
              duration: "15:00-18:00",
              address: "Place du Tertre, 75018 Paris, France",
            },
          ],
          [
            {
              "activity name": "Visit Chateau de Versailles",
              duration: "09:00-13:00",
              address: "Place d'Armes, 78000 Versailles, France",
            },
            {
              "activity name": "Visit Musée d'Orsay",
              duration: "14:00-17:00",
              address: "1 Rue de la Légion d'Honneur, 75007 Paris, France",
            },
            {
              "activity name": "Shopping in Champs-Élysées",
              duration: "18:00-20:00",
              address: "Avenue des Champs-Élysées, 75008 Paris, France",
            },
          ],
          [
            {
              "activity name": "Visit Sainte-Chapelle",
              duration: "09:00-11:00",
              address: "8 Boulevard du Palais, 75001 Paris, France",
            },
            {
              "activity name": "Visit the Pantheon",
              duration: "11:30-13:30",
              address: "Place du Panthéon, 75005 Paris, France",
            },
            {
              "activity name": "Visit the Centre Pompidou",
              duration: "14:00-17:00",
              address: "Place Georges-Pompidou, 75004 Paris, France",
            },
          ],
        ]),
      },
    ],
  });
  console.log("SEEDED SEARCHES", searches);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
