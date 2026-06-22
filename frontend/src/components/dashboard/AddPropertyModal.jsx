import { useState } from "react";
import { X } from "lucide-react";
import api from "../../lib/api";


const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-rose-500/50 transition-colors";

export default function AddPropertyModal({ onClose, onPropertyAdded }) {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        propertyType: "apartment",
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        address: "",
        city: "",
        state: "",
        country: "",
        amenities: [],
        bestSeason: ["all"],
        isFeatured: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            const formData = new FormData();
            files.forEach((file) => formData.append("images", file));
            const response = await api.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setImages((prev) => [...prev, ...response.data.urls]);
        } catch (err) {
            console.error("Image upload failed:", err);
        } finally {
            setUploading(false);
        }
    };

    function handleChange(event) {
        // Input name ke basis pe state update
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
    }

    const handleAmenityToggle = (value) => {
        setFormData((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(value)
                ? prev.amenities.filter((a => a !== value))
                : [...prev.amenities, value],
        }))
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setUploading(true);
        try {
            const formData = new FormData();
            files.forEach((f) => formData.append("images", f));
            const res = await api.post("/properties/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setImages(res.data.urls);
        } catch {
            setError("Image upload failed");
        }
        finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        console.log("Images at submit:", images);

        if (!formData.title || !formData.price || !formData.city || !formData.state) {
            setError("Please fill all required fields");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                propertyType: formData.propertyType,
                maxGuests: Number(formData.maxGuests),
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                images: images.map((url) => ({ url: url, public_id: "" })),
                location: {
                    city: formData.city,
                    state: formData.state,
                    country: formData.country,
                    address: formData.address,
                },
                amenities: formData.amenities,
                bestSeason: formData.bestSeason,
                isFeatured: formData.isFeatured,
            };

            const response = await api.post("/properties", payload);
            onPropertyAdded?.(response.data?.property ?? response.data);
            onClose?.();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add property");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
            <div className="bg-[#141414] p-6 rounded-2xl w-full max-w-lg space-y-4 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center">
                    {/* Header */}
                    <h2 className="text-white text-xl font-bold">Add Property</h2>
                    <button onClick={onClose} className="text-white/50 hover:text-white" type="button">
                        <X />
                    </button>
                </div>

                {/* Basic inputs */}
                <input
                    type="text"
                    name="title"
                    placeholder="Title *"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputCls}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className={inputCls}
                    rows={3}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price per night *"
                    value={formData.price}
                    onChange={handleChange}
                    className={inputCls}
                />

                {/* Property type */}
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} className={inputCls + " cursor-pointer"}>
                    {["apartment", "house", "villa", "hotel"].map((t) => (
                        <option key={t} value={t} className="bg-[#141414] text-white">
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </option>
                    ))}
                </select>

                {/* Location inputs */}
                <input
                    type="text"
                    name="address"
                    placeholder="Address *"
                    value={formData.address}
                    onChange={handleChange}
                    className={inputCls}
                />
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        value={formData.city}
                        onChange={handleChange}
                        className={inputCls}
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State *"
                        value={formData.state}
                        onChange={handleChange}
                        className={inputCls}
                    />
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                    <label className="text-white/30 text-xs w-full">Amenities</label>
                    <div className="flex flex-wrap gap-2">
                        {["wifi", "ac", "parking", "pool", "kitchen", "tv", "washing_machine"].map((a) => (
                            <button
                                key={a}
                                type="button"
                                onClick={() => handleAmenityToggle(a)}
                                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${formData.amenities.includes(a) ? "bg-rose-500 border-rose-500 text-white" : "border-white/10 text-white/70 hover:text-white"}`}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Best Season */}
                <div>
                <label className="text-white/30 text-xs mb-1 block">Best Season</label>
                <select
                    name="bestSeason" 
                    value={formData.bestSeason[0]}
                    onChange={(e) => setFormData(prev => ({ ...prev, bestSeason: [e.target.value] }))}
                    className={inputCls + " cursor-pointer"}
                >
                    {["all", "winter", "spring", "summer", "monsoon", "autumn"].map((s) => (
                        <option key={s} value={s} className="bg-[#141414] text-white">
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                    ))}
                </select>
                </div>
                {/* images */}
                <div className="flex items-col gap-2">
                    <label className="text-white/30 text-xs w-full">
                        Images
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="text-white/50 text-xs file:mr file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-rose-500 file:text-white hover:file:bg-rose-600 transition-colors disabled:opacity-60"
                    />
                    {uploading && <p className="text-sm text-white/50">Uploading...</p>}
                    {images.length > 0 && (
                        <p className="text-emerald-500 text-sm">{images.length} image(s) uploaded</p>
                    )}
                </div>

                <input
                    type="text"
                    name="country"
                    placeholder="Country *"
                    value={formData.country}
                    onChange={handleChange}
                    className={inputCls}
                />

                {/* Error message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={onClose}
                        type="button"
                        className="px-4 py-2 rounded-lg border border-white/15 text-white/70 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        type="button"
                        className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}
