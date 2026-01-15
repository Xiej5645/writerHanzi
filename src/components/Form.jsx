export default function Form(props) {

    const getPlaceholder = () => {
        return (props.isUnlimited) ? "Enter Chinese Characters" : "Enter up to 10 Chinese Characters";
      };
    
      const getMaxLengthValue = () => {
        return (props.isUnlimited) ? undefined : 10;
      };

    return (
        <form onSubmit={props.handleSubmit} id="char-form">
            <label htmlFor="chara">Jump to <a href="#pinyin" className="underline text-blue-600 hover:text-blue-800">pinyin converter</a> | Enter Chinese Characters:</label>
            <input 
                id="chara" 
                type="text" 
                placeholder={getPlaceholder()} 
                maxLength={getMaxLengthValue()}
                title = {getPlaceholder()}
                defaultValue="凤" 
                onChange={props.getUrlUpdated()}
            required />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded " type="submit" id="chara-button">Submit</button>
        </form>
    )
}