"use client";

import { validateSearchKeyword } from "@/app/search/action";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function SearchBar() {
	const [state, dispatch] = useFormState(validateSearchKeyword, null);
	const [keywordValue, setKeywordValue] = useState("");
	const params = useParams();
	useEffect(() => {
		setKeywordValue("");
	}, [params]);
	return (
		<div>
			<div>
				<form action={dispatch}>
					<input
						name="keyword"
						value={keywordValue}
						onChange={e => setKeywordValue(e.currentTarget.value)}
						type="text"
						placeholder="검색"
					/>
					<button>버튼</button>
				</form>
			</div>
		</div>
	);
}