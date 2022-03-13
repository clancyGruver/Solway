import Row from "./row";
//@ts-ignore

const DictionaryBody = () => {
  const showManyRows = () => {
    const rows = [];

    for (let i = 1; i < 1000; i += 1) {
      rows.push(<Row key={i} />);
    }
    return rows;
  }

  return (
    <tbody>
      {showManyRows()}
    </tbody>
)};

export default DictionaryBody;