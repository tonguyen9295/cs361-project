import React, { useState } from 'react';

export function SearchDropdown({onSelect}) {

    let muscleGroups = ["abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"];

    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);
        onSelect(selectedValue);
    }

    return (
        <div className="search-drop-down">
            <select className="search-drop-down-select" name="id" value={selectedValue} onChange={handleSelectChange}>
                <option value="" selected disabled hidden>Search by Muscle</option>
                {muscleGroups.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
}

export default SearchDropdown;