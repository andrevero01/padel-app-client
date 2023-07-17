import React from 'react'

function AddCourt ({filterExistingCourts, handleCourtSelect, handleChange, formData}) {
  return (
    <div className="flex justify-start mx-3 mt-6">
    <div className="flex flex-col w-full">
      <label className="font-bold mb-3">Select Home Court</label>
      <input
        type="text"
        placeholder="Home Court"
        name="court"
        value={formData.court}
        onChange={handleChange}
        className="input border mr-3 grow"
        required
      />
      {formData.homeCourt > 0 && (
        <div className="flex flex-col mr-3 rounded-xl bg-base-100">
          {filterExistingCourts(formData.courts).map((court) => (
            <button
              key={court._id}
              type="button"
              className="text-white-500 text-start ml-5 py-2 hover:underline"
              onClick={() => handleCourtSelect(court)}
            >
              {court.name}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
  )
}

export default AddCourt