import { GridColumnMenuContainer, GridColumnMenuFilterItem, GridColumnMenuHideItem } from "@mui/x-data-grid";

function CustomColumnMenu({ hideMenu, colDef, open }) {
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