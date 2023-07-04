import { GridColDef, GridColumnMenuContainer, GridColumnMenuFilterItem, GridColumnMenuHideItem } from "@mui/x-data-grid";
interface CustomColumnMenuProps{
    hideMenu: (event: React.SyntheticEvent<Element, Event>) => void
    colDef: GridColDef
    open: boolean
}
function CustomColumnMenu({ hideMenu, colDef, open }: CustomColumnMenuProps) {
  return (
    <GridColumnMenuContainer
        hideMenu={hideMenu}
        colDef={colDef}
        open={open}
    >
        <GridColumnMenuFilterItem onClick={hideMenu} colDef={colDef} />
        <GridColumnMenuHideItem onClick={hideMenu} colDef={colDef} />
    </GridColumnMenuContainer>
  )
}
export default CustomColumnMenu