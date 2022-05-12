// TextInput Data Object
export type TextFieldAttr = {
  width: string,
  id: string,
  label: string,
  password: boolean,
  autofocus: boolean
}

export type SubmittingAttr = {
  text: string,
  width: string
}

// NavItem Data Object
export type NavItemAttr = {
  item: string,
  url: string
}

// Subject Data Object
export type SubjectAttr = {
  title: string,
  englishTitle: string,
  list: any
}

// Problem Data Object
export type ProblemAttr = {
  key: number,
  title: string,
  bojId: number,
  tierName: string,
  tierLevel: number,
  acceptedCount: number,
  markFlag: boolean,
  averageTryCount: number,
  tagList: any,
}
