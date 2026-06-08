import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('../components/pdfViewer'), { ssr: false });

export default function CVPage() {
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
				<PDFViewer />
			</div>
		</div>
	);
}
