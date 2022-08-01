


export default function AddVehicle({license, setLicense, addVehicle}) {

  const handleChange = (e) => {
    setLicense(e.target.value);
  };


  return (
    <form>
      <button onClick={addVehicle} type="button">Add Vehicle</button>
      <label htmlFor="license">Enter License: </label>
      <input type="text" onChange={handleChange} name="license" value={license} id="license" />
    </form>
  )
}