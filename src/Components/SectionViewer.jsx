import React from 'react';

export default function SectionViewer({ sectionType, questions, onClose }) {

    const questionList = Object.values(questions || {});
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-6 w-full max-w-4xl rounded-xl shadow-xl">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {sectionType === 'mcq' && 'MCQs'}
                        {sectionType === 'theory' && 'Theoretical Questions'}
                        {sectionType === 'coding' && 'Coding Questions'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-700"
                    >
                        ✖
                    </button>
                </div>

                <div className="max-h-[500px] overflow-y-auto">
                    {sectionType === 'mcq' && (
                        <div>
                            {questionList.map((q, index) => (
                                <div key={index} className="border-b py-2">
                                    <p className="text-gray-700">{q.question}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {sectionType === 'theory' && (
                        <div>
                            {questionList.map((q, index) => (
                                <div key={index} className="border-b py-2">
                                    <p className="text-gray-700">{q.question}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {sectionType === 'coding' && (
                        <div>
                            {questionList.map((q, index) => (
                                <div key={index} className="border-b py-2">
                                    <p className="text-gray-700">{q.question}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
