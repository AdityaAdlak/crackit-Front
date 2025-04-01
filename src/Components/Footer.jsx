
  


// export default function Footer() {
//     return (
//       <footer
//         className="relative text-white text-center py-8 h-30 flex items-center justify-center bg-cover bg-center border-t border-gray-700"
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-60"></div>
//        <center> <p className="text-lg font-semibold relative z-10">
//           CrackIT by <span className="text-blue-500">Aditya</span>
//         </p>
//         <p className="text-lg font-semibold relative z-10">Master Technical Interviews... </p>
//         </center>
//       </footer>
//     );
//   }
  

export default function Footer() {
  return (
      <footer className="relative text-white text-center py-8 flex items-center justify-center bg-cover bg-center border-t border-gray-700 w-full mt-auto">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10">
              <p className="text-lg font-semibold">
                  CrackIT by <span className="text-blue-500">Aditya</span>
              </p>
              <p className="text-lg font-semibold">Master Technical Interviews...</p>
          </div>
      </footer>
  );
}
