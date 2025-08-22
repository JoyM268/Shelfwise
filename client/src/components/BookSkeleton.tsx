import { Skeleton } from "@/components/ui/skeleton";

export default function BookSkeleton() {
	return (
		<div className=" pb-2 px-1">
			<Skeleton className="w-36 h-52 sm:w-40 rounded-xs" />
			<Skeleton className="w-36 h-5 sm:w-40 mt-3" />
			<Skeleton className="w-32 h-3 sm:w-36 mt-1" />
		</div>
	);
}
