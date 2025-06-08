import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                    Strona nie została znaleziona
                </h2>
                <p className="text-gray-500 mb-8">
                    Przepraszamy, strona której szukasz nie istnieje.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
                >
                    Wróć do strony głównej
                </Link>
            </div>
        </div>
    );
}
