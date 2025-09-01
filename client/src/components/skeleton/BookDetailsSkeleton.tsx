import { Skeleton } from "@/components/ui/skeleton";

export default function BookDetailsSkeleton() {
	return (
		<div className="grid md:grid-cols-[minmax(200px,_auto)_1fr] px-6 mt-9 gap-12 grid-cols-1 pb-16">
			<div className="mx-auto w-full">
				<Skeleton className="h-90 w-60 rounded-lg mx-auto" />
				<Skeleton className="w-full mt-4 h-10" />
				<Skeleton className="w-full mt-3 h-10" />
			</div>
			<div className="sm:pr-20">
				<Skeleton className="w-full h-12" />
				<Skeleton className="w-full h-6 mt-4" />
				<Skeleton className="mt-4 h-4 w-2/6" />
				<div className="flex flex-wrap items-center mt-5 gap-2.5">
					{[1, 2, 3, 4].map((ele) => {
						return (
							<Skeleton
								key={ele}
								className="rounded-lg w-20 h-6"
							/>
						);
					})}
				</div>
				<Skeleton className="w-full h-28 mt-7" />
				<Skeleton className="h-72 mt-7" />
			</div>
		</div>
	);
}
