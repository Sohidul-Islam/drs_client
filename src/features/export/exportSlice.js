import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Thunk for exporting PDF
export const exportPDF = createAsyncThunk(
  "export/pdf",
  async ({ columns, data, title }, thunkAPI) => {
    try {
      const tableRows = data.map(row => columns.map(col => row[col]));
      const doc = new jsPDF();
      doc.autoTable({ head: [columns], body: tableRows, startY: 20 });
      doc.text(title, 14, 15);
      const filename = `${title}_${new Date().toISOString()}.pdf`;
      doc.save(filename);
      return filename;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for exporting Excel
export const exportExcel = createAsyncThunk(
  "export/excel",
  async ({ columns, data, title }, thunkAPI) => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = {
        Sheets: { 'data': worksheet },
        SheetNames: ['data']
      };
      const filename = `${title}_${new Date().toISOString()}.xlsx`;
      XLSX.writeFile(workbook, filename);
      return filename;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const exportSlice = createSlice({
  name: "export",
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(exportPDF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exportPDF.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(exportPDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(exportExcel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exportExcel.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(exportExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default exportSlice.reducer;