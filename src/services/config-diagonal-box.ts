import { BOXES_SELECTOR } from "../utils/constants";

const isBoxesInViewportMap = new Map<HTMLDivElement, true>();
let animationId: number | null = null;
let extraHeight = 0;

const getBoxes = (): NodeListOf<HTMLDivElement> => {
  return document.querySelectorAll<HTMLDivElement>(BOXES_SELECTOR);
};

const addInlineStylesToBox = (box: HTMLDivElement): void => {
  box.style.display = "flex";
  box.style.alignItems = "end";
};

const addSvgAndLineToBox = (box: HTMLDivElement): void => {
  const boxRect = box.getBoundingClientRect();

  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );

  let currentHeight = boxRect.height;

  const minHeight = boxRect.top - extraHeight;

  if (minHeight <= 0) {
    currentHeight = Math.max(boxRect.height + minHeight, 0);
  }

  svgElement.setAttribute("preserveAspectRatio", "none");
  svgElement.setAttribute("viewBox", `0 0 ${boxRect.width} ${boxRect.height}`);
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("height", currentHeight.toString());

  box.appendChild(svgElement);

  const lineElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );

  lineElement.setAttribute("vector-effect", "non-scaling-stroke");
  lineElement.setAttribute("x1", "0");
  lineElement.setAttribute("y1", "100%");
  lineElement.setAttribute("x2", "100%");
  lineElement.setAttribute("y2", "0");

  lineElement.setAttribute("stroke", "black");
  lineElement.setAttribute("stroke-width", "2");

  svgElement.appendChild(lineElement);
};

const updateSvgHeightToBox = (box: HTMLDivElement): void => {
  const boxRect = box.getBoundingClientRect();

  const svgElement = box.children[0];

  let currentHeight = boxRect.height;

  const minHeight = boxRect.top - extraHeight;

  if (minHeight <= 0) {
    currentHeight = Math.max(boxRect.height + minHeight, 0);
  }

  svgElement.setAttribute("height", currentHeight.toString());
};

const animation: FrameRequestCallback = () => {
  if (isBoxesInViewportMap.size === 0 && typeof animationId === "number") {
    cancelAnimationFrame(animationId);
  }

  for (const [box] of isBoxesInViewportMap) {
    updateSvgHeightToBox(box);
  }

  animationId = requestAnimationFrame(animation);
};

interface ConfigDiagonalBoxOptions {
  fixedHeader?: Element;
  logs?: boolean;
}

export const configDiagonalBox = (config?: ConfigDiagonalBoxOptions): void => {
  if (config?.logs === true) {
    console.log("CONFIG DIAGONAL BOX INIT");
  }

  const boxes = getBoxes();

  if (config?.logs === true) {
    console.log(`NUMBER OF DIAGONAL BOXES: ${boxes.length}`);
  }

  const headerRect = config?.fixedHeader?.getBoundingClientRect();

  if (headerRect !== undefined) {
    extraHeight = headerRect.height;
  }

  const observer = new IntersectionObserver((entities) => {
    for (const entity of entities) {
      if (!(entity.target instanceof HTMLDivElement)) continue;

      if (entity.isIntersecting) {
        isBoxesInViewportMap.set(entity.target, true);
      } else {
        isBoxesInViewportMap.delete(entity.target);
      }
    }

    if (isBoxesInViewportMap.size > 0) {
      requestAnimationFrame(animation);
    }
  });

  for (const box of boxes) {
    addInlineStylesToBox(box);
    addSvgAndLineToBox(box);
    observer.observe(box);
  }
};
