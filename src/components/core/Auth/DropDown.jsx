
export const DropDown = ({data,formData,changeHandler}) => {
  return (
    <div className="w-[25%] mt-2 px-1 md:px-3 text-richblack-200 flex items-center bg-richblack-800 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#424854]">
      <select
          className="outline-none w-full bg-richblack-800"
          name="code"
          size={1}
          value={formData}
          onInput={changeHandler}
          onChange={changeHandler}>
          {
              data.map((element,index)=>{
                  return <option key={index} value={`${element.code}`}>
                      {element.code}
                  </option>
              })
          }
      </select>
    </div>
  );
};