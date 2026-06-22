import { useState } from "react";
import api from "../lib/api";
import Loader from "../components/common/Loader";
import { useSearchParams } from "react-router-dom";

const TripPlanner = () => {
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    destination: searchParams.get("destination") || "",
    checkIn: "",
    checkOut: "",
    budget: "",
    travelers: "1",
  });

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { destination, checkIn, checkOut, budget, travelers } = form;

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setItinerary(null);
    try {
      const res = await api.post("/trips/generate", form);
      setItinerary(res.data.itinerary);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const travelerOptions = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <header className="text-center mb-10">
          <h1 className="font-['Playfair_Display'] text-4xl font-bold mb-3">
            AI Trip Planner
          </h1>
          <p className="text-gray-400 text-lg">
            Enter your details and let AI craft your perfect itinerary.
          </p>
          {destination && (
            <p className="mt-3 text-rose-400 text-sm">
              Planning your trip to {destination}
            </p>
          )}
        </header>

        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm text-gray-400 mb-2">Destination</label>
              <input
                type="text"
                name="destination"
                value={destination}
                onChange={handleChange}
                placeholder="e.g. Goa, India"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Check-in", name: "checkIn", value: checkIn },
                { label: "Check-out", name: "checkOut", value: checkOut },
              ].map(({ label, name, value }) => (
                <div key={name}>
                  <label className="block text-sm text-gray-400 mb-2">{label}</label>
                  <input
                    type="date"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Total Budget (Rs)</label>
                <input
                  type="number"
                  name="budget"
                  value={budget}
                  onChange={handleChange}
                  placeholder="e.g. 30000"
                  min="1"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Travelers</label>
                <select
                  name="travelers"
                  value={travelers}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500"
                >
                  {travelerOptions.map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "Traveler" : "Travelers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && <p className="text-rose-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Generating Itinerary..." : "Generate My Itinerary"}
            </button>
          </form>
        </section>

        {loading && (
          <div className="text-center py-10">
            <Loader />
            <p className="text-gray-400 mt-4">AI is crafting your perfect trip...</p>
          </div>
        )}

        {itinerary && (
          <section className="space-y-6">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-sm uppercase tracking-wide text-rose-400 mb-2">Your itinerary</p>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-2">
                {itinerary.destination}
              </h2>
              <div className="flex flex-wrap gap-3 text-sm text-gray-300">
                <span>{itinerary.totalDays} days</span>
                <span>Budget per person: {itinerary.estimatedBudgetPerPerson}</span>
              </div>
            </div>

            {itinerary.highlights?.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {itinerary.highlights.map((highlight, index) => (
                    <div
                      key={`${highlight}-${index}`}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-gray-200"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {itinerary.days?.map((day) => (
              <article
                key={day.day}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <p className="text-rose-400 text-sm font-semibold mb-2">Day {day.day}</p>
                <h3 className="text-2xl font-bold mb-5">{day.title}</h3>

                <div className="space-y-4">
                  {day.activities?.map((activity, index) => (
                    <div
                      key={`${activity.activity}-${index}`}
                      className="border-l-2 border-rose-500/70 pl-4"
                    >
                      <p className="text-sm text-gray-400">{activity.time}</p>
                      <h4 className="font-semibold text-lg">{activity.activity}</h4>
                      <p className="text-gray-300 mt-1">{activity.description}</p>
                      <p className="text-sm text-rose-300 mt-2">
                        Estimated cost: {activity.estimatedCost}
                      </p>
                    </div>
                  ))}
                </div>

                {day.accommodation && (
                  <div className="mt-6 bg-white/5 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Accommodation</h4>
                    <p className="text-gray-300">{day.accommodation.suggestion}</p>
                    <p className="text-sm text-rose-300 mt-1">
                      {day.accommodation.estimatedCost}
                    </p>
                  </div>
                )}
              </article>
            ))}

            {itinerary.travelTips?.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">Travel Tips</h3>
                <ul className="space-y-3 text-gray-300">
                  {itinerary.travelTips.map((tip, index) => (
                    <li key={`${tip}-${index}`}>- {tip}</li>
                  ))}
                </ul>
              </div>
            )}

          </section>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
