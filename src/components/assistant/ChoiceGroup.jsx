import { forwardRef, useImperativeHandle, useRef, useState } from "react";

// Shared accessible single-choice radiogroup used for Service Needed,
// Primary Project Goal, and Preferred Start (Stage 6B-1G). Stores only
// canonical option.id values via onChange — never translated labels, so the
// underlying form data model is unchanged from the native <select> it
// replaces.
const ChoiceGroup = forwardRef(function ChoiceGroup(
  { id, options, value, onChange, labelledBy, describedBy, invalid, isRtl, layout = "rows" },
  ref
) {
  const tileRefs = useRef({});
  const [focusedId, setFocusedId] = useState(null);
  const activeId = value || focusedId || options[0]?.id;

  // Lets ProjectLeadForm treat this group like any other field ref when
  // focusing the first invalid control on a blocked Continue attempt.
  useImperativeHandle(ref, () => ({
    focus: () => tileRefs.current[activeId]?.focus()
  }));

  const selectOption = (optionId) => {
    onChange(optionId);
    setFocusedId(optionId);
  };

  const moveFocus = (fromId, delta) => {
    const index = options.findIndex((option) => option.id === fromId);
    if (index === -1) return;
    const nextId = options[(index + delta + options.length) % options.length].id;
    tileRefs.current[nextId]?.focus();
    setFocusedId(nextId);
  };

  const onKeyDown = (event, optionId) => {
    const horizontal = event.key === "ArrowRight" ? (isRtl ? -1 : 1) : event.key === "ArrowLeft" ? (isRtl ? 1 : -1) : 0;
    const vertical = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
    const delta = horizontal || vertical;
    if (delta) {
      event.preventDefault();
      moveFocus(optionId, delta);
      return;
    }
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      selectOption(optionId);
    }
  };

  return (
    <div
      className={`sa-choice-group sa-choice-group--${layout}`}
      role="radiogroup"
      id={id}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
    >
      {options.map((option) => {
        const selected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`sa-choice-tile${selected ? " is-selected" : ""}`}
            tabIndex={option.id === activeId ? 0 : -1}
            ref={(node) => {
              tileRefs.current[option.id] = node;
            }}
            onClick={() => selectOption(option.id)}
            onKeyDown={(event) => onKeyDown(event, option.id)}
            onFocus={() => setFocusedId(option.id)}
          >
            <span className="sa-choice-tile__check" aria-hidden="true" />
            <span className="sa-choice-tile__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
});

export default ChoiceGroup;
