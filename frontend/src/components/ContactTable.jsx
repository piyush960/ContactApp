import { useEffect, useState, useMemo } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Fab, LinearProgress } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { get_contacts, delete_contact } from '../services/ContactService'

function createData(id, first_name, last_name, email, phone_number, company, job_title) {
	return { id, first_name, last_name, email, phone_number, company, job_title };
}

const rows = [
	// createData(1, 'John', 'Doe', 'john.doe@example.com', '123-456-7890', 'Example Corp', 'Software Engineer'),
	// createData(2, 'Jane', 'Smith', 'jane.smith@example.com', '234-567-8901', 'Tech Innovations', 'Product Manager'),
	// createData(3, 'Alice', 'Johnson', 'alice.johnson@example.com', '345-678-9012', 'Creative Solutions', 'Designer'),
	// createData(4, 'Bob', 'Brown', 'bob.brown@example.com', '456-789-0123', 'Global Enterprises', 'Sales Executive'),
	// createData(5, 'Charlie', 'Davis', 'charlie.davis@example.com', '567-890-1234', 'Marketing Inc.', 'Marketing Specialist'),
	// createData(6, 'a', 'b', 'charcclie.davis@example.com', '567-dfa-1234', 'Markfdseting Inc.', 'Mafdrketing Specialist'),
];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
	{ id: 'first_name', disablePadding: false, label: 'First Name' },
	{ id: 'last_name', disablePadding: false, label: 'Last Name' },
	{ id: 'email', disablePadding: false, label: 'Email' },
	{ id: 'phone_number', disablePadding: false, label: 'Mobile' },
	{ id: 'company', disablePadding: false, label: 'Company' },
	{ id: 'job_title', disablePadding: false, label: 'Designation' },
];

function EnhancedTableHead(props) {
	const {order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell>Edit/Delete</TableCell>
			</TableRow>
		</TableHead>
	);
}

export default function ContactTable({onOpenModal, reload, setIsToastOpen, setToastMsg}) {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [rows, setRows] = useState([])
	const [isLoading, setIsLoading] = useState(false)


	useEffect(() => {
		fetchContacts()
	}, [reload])

	const fetchContacts = async () => {
		try{
			setIsLoading(true)
			const res = await get_contacts()
			setRows(res.data.data)
			setIsLoading(false)
		}
		catch(e){
			setIsLoading(false)
			setToastMsg('Failed to Fetch Contacts')
			setIsToastOpen(true)
			console.log(e)
		}
	}

	const visibleRows = useMemo(
		() =>
			[...rows]
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[rows, order, orderBy, page, rowsPerPage],
	);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleClick = (event, first_name) => {
		const selectedIndex = selected.indexOf(first_name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, first_name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		console.log(newPage)
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		const selectedValue = parseInt(event.target.value, 10)
		setRowsPerPage(selectedValue);
		setPage(0);
	};

	const handleEditClick = (e, row) => {
		onOpenModal(row, 'edit')
	}

	const handleDeleteClick = async (e, row) => {
		setIsLoading(true)
		try{
			const response = await delete_contact(row.id)
			if(response.data.success){
				setTimeout(fetchContacts, 500)
				setToastMsg('Deleted Successfully')
				setIsToastOpen(true)
			}
			else{
				setToastMsg('Failed to Delete')
				setIsToastOpen(true)
			}
		}
		catch(e){
			console.log(e)
		}

	}

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<TableContainer>
				<Box sx={{ width: '100%' }} display={isLoading ? 'block' : 'none'}><LinearProgress /></Box> 
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{visibleRows.map((row) => {
								return (
									<TableRow
										hover
										onClick={(event) => handleClick(event, row.first_name)}
										tabIndex={-1}
										key={row.id}
										sx={{ cursor: 'pointer' }}
									>
										<TableCell align="left">{row.first_name}</TableCell>
										<TableCell align="left">{row.last_name}</TableCell>
										<TableCell align="left">{row.email}</TableCell>
										<TableCell align="left">{row.phone_number}</TableCell>
										<TableCell align="left">{row.company}</TableCell>
										<TableCell align="left">{row.job_title}</TableCell>
										<TableCell align="left">
											<Fab color="secondary" onClick={(e) => handleEditClick(e, row)} size='small' aria-label="edit" sx={{mr: 1}}><Edit /></Fab>
											<Fab color="error" onClick={(e) => handleDeleteClick(e, row)} size='small' aria-label="delete"><Delete /></Fab>
										</TableCell>
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, { value: rows.length, label: 'All' }]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}