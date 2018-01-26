// import React from 'react';
// import ImportDialog from './ImportDialog';
// import renderer from 'react-test-renderer';

// it('ok', () => {
  
//     const component = renderer
//     .create(
//         <ImportDialog importData={()=>{}} closeDialog={()=>{}}/>,
//       )
//       .getInstance();

//     expect(component.checkImportString("012345")).toBeTruthy();
//     expect(component.checkImportString("1")).toBeTruthy();
//     expect(component.checkImportString("a")).toBeFalsy();
//     expect(component.checkImportString("abc")).toBeFalsy();
//     expect(component.checkImportString("")).toBeFalsy();
//     expect(component.checkImportString("1a")).toBeFalsy();
//     expect(component.checkImportString("a1")).toBeFalsy();
//     expect(component.checkImportString(" ")).toBeFalsy();
//     expect(component.checkImportString("1 ")).toBeFalsy();
//     expect(component.checkImportString(" 1")).toBeFalsy();
//     expect(component.checkImportString(null)).toBeFalsy();
//     expect(component.checkImportString(undefined)).toBeFalsy();
//     expect(component.checkImportString("\t")).toBeFalsy();
// });
