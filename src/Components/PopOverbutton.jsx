import { specsExplanations } from "../utils/specs";

export default function PopOverbutton({ IdParole, Specs }) {
  const findingWord = (IdClicked) => {
    const fullWord = Specs?.[IdClicked];
    if (!fullWord) return "";

    const FirstWord = fullWord.split(" ")[0];
    const Formatted = FirstWord.slice(0, -1);

    const FindingExplanation = specsExplanations.find(
      (el) => el.key === Formatted,
    );
    return FindingExplanation?.description || "";
  };

  return (
    <button
      style={{ border: "none", background: "none" }}
      data-bs-container="body"
      data-bs-toggle="popover"
      data-bs-placement="bottom"
      data-bs-content={findingWord(IdParole)}
    >
      <i className="bi bi-info-circle"></i>
    </button>
  );
}
