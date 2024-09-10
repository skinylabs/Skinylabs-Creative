interface ToggleRoundSwitcherProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const ToggleRoundSwitcher: React.FC<ToggleRoundSwitcherProps> = ({
    checked,
    onChange,
}) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <div className="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"></div>
        </label>
    );
};

export default ToggleRoundSwitcher;
