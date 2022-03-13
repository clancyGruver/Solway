const DictionaryFooter = () => (
  <tfoot className="border-t border-purple-300">
    <tr>
      <td colSpan={0}>
        <button
          type="button"
          className="my-3 m-2 active:bg-blue-300 hover:bg-blue-600 bg-blue-500 border-2 border-blue-800 rounded px-6 py-1 text-white"
        >
          save
        </button>
      </td>
    </tr>
  </tfoot>
);

export default DictionaryFooter;