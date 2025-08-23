import { motion } from "motion/react";

const Loader = () => {
	const transition = (x: number) => {
		return {
			duration: 1,
			repeat: Infinity,
			repeatType: "loop" as const,
			delay: x * 0.2,
			ease: "easeInOut" as const,
		};
	};
	return (
		<div className="flex items-center gap-2">
			<motion.div
				initial={{
					y: 0,
				}}
				animate={{
					y: [0, 10, 0],
				}}
				transition={transition(0)}
				className="sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-neutral-400 bg-gradient-to-b from-neutral-500 to-neutral-400"
			/>
			<motion.div
				initial={{
					y: 0,
				}}
				animate={{
					y: [0, 10, 0],
				}}
				transition={transition(1)}
				className="sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-neutral-400 bg-gradient-to-b from-neutral-500 to-neutral-400"
			/>
			<motion.div
				initial={{
					y: 0,
				}}
				animate={{
					y: [0, 10, 0],
				}}
				transition={transition(2)}
				className="sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-neutral-400 bg-gradient-to-b from-neutral-500 to-neutral-400"
			/>
		</div>
	);
};

export default Loader;
