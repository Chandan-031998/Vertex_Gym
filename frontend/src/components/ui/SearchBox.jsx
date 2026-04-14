import Input from '../common/Input';

export default function SearchBox({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="w-full max-w-md">
      <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </div>
  );
}
