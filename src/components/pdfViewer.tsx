'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import React, { useState } from 'react';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Requerido para que PDF.js funcione correctamente
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer() {
	const [numPages, setNumPages] = useState<number | null>(null);

	return (
		<Document
			file="/CV.pdf"
			onLoadSuccess={({ numPages }) => setNumPages(numPages)}
			onLoadError={console.error}
		>
			{Array.from(new Array(numPages), (_, index) => (
				<Page key={index} pageNumber={index + 1} />
			))}
		</Document>
	);
}
