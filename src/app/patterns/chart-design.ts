import PatternCircles from "./pattern-circles";
import PatternDashedDiagonals from "./pattern-dashed-diagonals";
import PatternDiagonals from "./pattern-diagonals";
import PatternSquares from "./pattern-squares";
import PatternVerticalLines from "./pattern-vertical-lines";
import PatternZigzag from "./pattern-zigzag";

export default function () {
  const patternsStandardList = [
    PatternSquares,
    PatternDiagonals,
    PatternZigzag,
    PatternVerticalLines,
    PatternDashedDiagonals,
    PatternCircles,
  ] as ((
    hover: boolean,
    color: string,
    disableAccessibility: boolean
  ) => CanvasPattern)[];

  const colourSets: [
    string[],
    string[],
    string[],
    string[],
    string[],
    string[],
    string[]
  ] = [
    ["#393879", "#006974", "#405D68", "#005C91", "#8C3500", "#8C0003"],
    ["#A274FF", "#143666", "#00A3B2", "#8C1551", "#F255A3", "#095359"],
    ["#00A3B2", "#143666", "#3D993D", "#8C1551", "#E56D17", "#4C3380"],
    ["#8C1551", "#E56D17", "#4C3380", "#4588E5", "#095359", "#F255A3"],
    ["#4588E5", "#4C3380", "#E56D17", "#143666", "#D94141", "#8C1551"],
    ["#143666", "#F255A3", "#095359", "#4588E5", "#8C1551", "#E56D17"],
    ["#A274FF", "#B0BBC0", "#B0BBC0", "#B0BBC0", "#B0BBC0", "#B0BBC0"],
  ];

  return {
    patternsStandardList,
    colourSets,
  };
}
