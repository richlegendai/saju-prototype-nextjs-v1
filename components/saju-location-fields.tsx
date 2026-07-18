import type { Dictionary } from "@/lib/dictionary";

type SajuLocationFieldsProps = {
  country: string;
  city: string;
  form: Dictionary["form"];
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
};

export function SajuLocationFields({
  country,
  city,
  form,
  onCountryChange,
  onCityChange,
}: SajuLocationFieldsProps) {
  return (
    <>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="country">{form.country}</label>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="off"
            value={country}
            onChange={(event) => onCountryChange(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="city">{form.city}</label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="off"
            value={city}
            onChange={(event) => onCityChange(event.target.value)}
          />
        </div>
      </div>
      <p className="field-note">{form.locationNotUsed}</p>
    </>
  );
}
