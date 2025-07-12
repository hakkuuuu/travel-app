interface DestinationFiltersProps {
  searchTerm: string;
  selectedAmenity: string;
  amenities: string[];
  onSearchChange: (value: string) => void;
  onAmenityChange: (value: string) => void;
}

export default function DestinationFilters({
  searchTerm,
  selectedAmenity,
  amenities,
  onSearchChange,
  onAmenityChange
}: DestinationFiltersProps) {
  return (
    <div className="mb-10 flex flex-col md:flex-row gap-4 items-stretch justify-center">
      <div className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search destinations by name or location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 shadow"
        />
      </div>
      <div className="w-full md:w-64">
        <select
          value={selectedAmenity}
          onChange={(e) => onAmenityChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 shadow appearance-none"
        >
          <option value="">All Amenities</option>
          {amenities.map((amenity) => (
            <option key={amenity} value={amenity}>{amenity}</option>
          ))}
        </select>
      </div>
    </div>
  );
} 