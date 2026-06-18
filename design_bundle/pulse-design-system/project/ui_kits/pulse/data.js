// Sample content for the Pulse UI kit. Plain globals (no module system).
window.PULSE_DATA = (function () {
  const events = [
    {
      id: "jazz", category: "Live music", title: "Warehouse jazz, after hours",
      date: "Fri · 9:00pm", venue: "The Lot", distance: "0.4mi", price: 12,
      freshness: "added 2h ago", score: 94,
      relevance: ["live music", "under $15", "near you"],
      sources: ["Resident Advisor", "DICE"], img: "18% 30%",
      blurb: "A late-night quartet in a converted loading dock — BYO, low ceilings, loud horns. The kind of room that doesn't advertise.",
    },
    {
      id: "bridges", category: "Talk", title: "A short history of the city's bridges",
      date: "Sun · 2:00pm", venue: "Carnegie Library", distance: "1.1mi", free: true,
      freshness: "added 6h ago", gem: true, score: 88,
      relevance: ["history", "free", "rarely listed"],
      sources: ["City Library"], img: "70% 40%",
      blurb: "An engineer-turned-historian walks through two centuries of river crossings. Free, seats limited, almost never shows up in other apps.",
    },
    {
      id: "riso", category: "Workshop", title: "Risograph zine night",
      date: "Thu · 7:00pm", venue: "Press Room", distance: "0.8mi", price: 25,
      freshness: "added 1d ago", gem: true, score: 83,
      relevance: ["art", "hands-on", "small venue"],
      sources: ["Meetup"], img: "45% 70%",
      blurb: "Two-color printing, bring an idea, leave with a stack. Ink-stained fingers guaranteed.",
    },
    {
      id: "market", category: "Market", title: "Saturday makers' market",
      date: "Sat · 10:00am", venue: "Old Customs Yard", distance: "0.6mi", free: true,
      freshness: "added 3h ago", score: 79,
      relevance: ["free", "weekends", "food"],
      sources: ["Eventbrite", "Fever"], img: "60% 25%",
      blurb: "Forty stalls of ceramics, secondhand books, and very good dumplings.",
    },
    {
      id: "film", category: "Film", title: "Late screening: noir double bill",
      date: "Fri · 10:30pm", venue: "Roxy Cinema", distance: "1.4mi", price: 14,
      freshness: "added 5h ago", score: 86,
      relevance: ["film", "under $15", "tonight"],
      sources: ["Songkick"], img: "30% 55%",
      blurb: "Two restored prints, one intermission, no phones.",
    },
    {
      id: "club", category: "Club", title: "Basement: dub & low end",
      date: "Sat · 11:00pm", venue: "Sub Club", distance: "2.0mi", price: 18,
      freshness: "added 9h ago", score: 90,
      relevance: ["live music", "late"],
      sources: ["Resident Advisor", "DICE", "Eventbrite"], img: "80% 70%",
      blurb: "Sound-system night with a guest selector. Doors late, ends later.",
    },
    {
      id: "supper", category: "Food", title: "Pop-up supper: coastal Portugal",
      date: "Wed · 7:30pm", venue: "Apt. 4 (address on booking)", distance: "0.9mi", price: 45,
      freshness: "added 2d ago", gem: true, score: 81,
      relevance: ["food", "intimate"],
      sources: ["Luma"], img: "20% 80%",
      blurb: "Twelve seats, five courses, one chef's apartment. The opposite of a chain.",
    },
    {
      id: "comedy", category: "Comedy", title: "New material night",
      date: "Tue · 8:00pm", venue: "The Stand", distance: "1.7mi", price: 10,
      freshness: "added 12h ago", score: 74,
      relevance: ["comedy", "under $15"],
      sources: ["Eventbrite"], img: "50% 40%",
      blurb: "Seven comics trying things that may not work yet. Cheap, honest, occasionally great.",
    },
    {
      id: "choir", category: "Live music", title: "Lunchtime choral recital",
      date: "Thu · 1:00pm", venue: "St. Anne's", distance: "0.3mi", free: true,
      freshness: "added 4h ago", gem: true, score: 77,
      relevance: ["free", "near you", "quiet"],
      sources: ["City Listings"], img: "65% 60%",
      blurb: "Forty minutes of polyphony in a cool stone nave. Slip out of the office, slip back in.",
    },
    {
      id: "theatre", category: "Theatre", title: "Promenade piece: the night port",
      date: "Sat · 6:00pm", venue: "Harbour District", distance: "2.4mi", price: 30,
      freshness: "added 1d ago", score: 84,
      relevance: ["theatre", "outdoors"],
      sources: ["Eventbrite", "DICE"], img: "35% 35%",
      blurb: "A walking performance that moves through three warehouses as the light goes.",
    },
  ];

  const cities = [
    { id: "lisbon", name: "Lisbon", country: "Portugal", count: 412 },
    { id: "berlin", name: "Berlin", country: "Germany", count: 1340 },
    { id: "porto", name: "Porto", country: "Portugal", count: 188 },
    { id: "reykjavik", name: "Reykjavík", country: "Iceland", count: 23 },
    { id: "nyc", name: "New York", country: "USA", count: 2980 },
    { id: "mexico", name: "Mexico City", country: "Mexico", count: 870 },
  ];

  const interests = ["Live music", "Art", "Film", "Food", "Theatre", "Talks", "Comedy", "Markets", "Workshops", "Clubs", "Books", "Design"];

  return { events, cities, interests };
})();
