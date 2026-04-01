"use client";

const MAX_CHARS = 200;

interface CardMessageInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CardMessageInput({
  value,
  onChange,
}: CardMessageInputProps) {
  const remaining = MAX_CHARS - value.length;

  return (
    <div>
      <label
        htmlFor="card-message"
        className="mb-1 block text-sm font-semibold text-gray-700"
      >
        Card message
      </label>
      <textarea
        id="card-message"
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= MAX_CHARS) {
            onChange(e.target.value);
          }
        }}
        maxLength={MAX_CHARS}
        rows={3}
        placeholder="Write a personal message for the card..."
        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] focus:outline-none"
      />
      <p className="mt-1 text-right text-xs text-gray-400">
        {remaining} character{remaining !== 1 ? "s" : ""} remaining
      </p>
    </div>
  );
}
