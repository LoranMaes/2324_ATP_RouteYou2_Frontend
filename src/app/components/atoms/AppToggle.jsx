/**
 * AppToggle component.
 * @name AppToggle
 * @component
 * @description Provides a toggle component to be used in a react-hook-form.
 * @param {string} name - The name of the toggle. Defaults to "ToggleName".
 * @param {string} label - The label of the toggle. Defaults to "Toggle label".
 * @param {any} value - The value of the toggle.
 * @param {boolean} checked - Whether the toggle is checked or not. Defaults to false.
 * @param {function} onChange - The function to be called when the toggle value changes.
 * @returns {JSX.Element} The rendered AppToggle component.
 */
const AppToggle = ({
  name = "ToggleName",
  label = "Toggle label",
  value,
  checked = false,
  onChange,
  validationSchema,
  register,
  font_bold = true,
}) => {
  return (
    <div
      className="relative inline-flex items-center cursor-pointer gap-[3rem] w-fit"
      onClick={() => {
        document.getElementById(name).click();
      }}
      data-testid={`toggle-${name}`}
    >
      <label
        htmlFor={name}
        className={`text-base ${
          font_bold ? "font-bold" : "font-medium"
        } select-none`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="checkbox"
          role="switch"
          value={value}
          name={name}
          id={name}
          className="sr-only peer"
          checked={checked}
          // aria-checked={checked}
          onChange={onChange}
          {...register(name, validationSchema)}
        />
        <div className="w-[5.6rem] h-[2.8rem] shadow-md after:shadow-md peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gray rounded-full peer peer-checked:after:translate-x-[2.6rem] after:left-[0.5rem] after:content-[''] after:absolute after:top-[0.4rem] after:bg-white after:bg-primary-green peer-checked:after:bg-background after:rounded-full after:h-[2rem] after:w-[2rem] after:transition-all peer-checked:bg-primary-green rtl:peer-checked:after:translate-x-[2.6rem] peer-checked:after:border-white "></div>
      </div>
    </div>
  );
};

export default AppToggle;
