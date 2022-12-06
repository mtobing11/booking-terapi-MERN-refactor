import React from 'react';

// import components
import { Paper, Table, TableCell, TableRow, TableBody, TableHead, TableContainer } from '@mui/material';
import ModifyMenu from '../../pages/dateControl/ModifyMenu';

const TableForDisplay = ({ headArr=[], contentArr=[], dates=[], needAddMenu=false }) => {
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} stickyHeader aria-label="table-dates" size='small'>
            <TableHead>
                <TableRow>
                  {headArr.map((head, idx) => (
                    idx === 0 ? <TableCell align='left' key={`${head}${idx}`}>{head}</TableCell> : <TableCell align='right' key={`${head}${idx}`}>{head}</TableCell>
                  ))}
                </TableRow>
            </TableHead>
            <TableBody>
              {contentArr.map((contentItemArr, idx) => (
                <TableRow key={`${contentItemArr}-${idx}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {contentItemArr.map((content, idn) => (
                    idn === contentItemArr.length - 1 && needAddMenu ? 
                    <TableCell key={`cellrow-${idn}`} align='right'><ModifyMenu id={contentItemArr[6]} data={dates[idx]} /></TableCell> : idn === 0 ?
                    <TableCell key={`cellrow-${idn}`} align='left'>{content}</TableCell> :
                    <TableCell key={`cellrow-${idn}`} align='right'>{content}</TableCell> 
                  ))}
                </TableRow>
              ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default TableForDisplay