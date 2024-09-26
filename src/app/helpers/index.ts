export const variants = (duration: number) => ({
  hidden: {x: 100, opacity: 1},
  visible: {x: 0, opacity: 1, transition: {duration: duration}},
});
