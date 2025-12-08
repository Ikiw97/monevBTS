"import { Request, Response } from 'express';
import { createServerSupabase } from '../../shared/supabase';

// Contoh: Get data dari table
export async function handleGetData(req: Request, res: Response) {
  try {
    const supabase = createServerSupabase();
    const { tableName } = req.params;
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*');
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Contoh: Insert data ke table
export async function handleInsertData(req: Request, res: Response) {
  try {
    const supabase = createServerSupabase();
    const { tableName } = req.params;
    const insertData = req.body;
    
    const { data, error } = await supabase
      .from(tableName)
      .insert(insertData)
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Contoh: Update data
export async function handleUpdateData(req: Request, res: Response) {
  try {
    const supabase = createServerSupabase();
    const { tableName, id } = req.params;
    const updateData = req.body;
    
    const { data, error } = await supabase
      .from(tableName)
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Contoh: Delete data
export async function handleDeleteData(req: Request, res: Response) {
  try {
    const supabase = createServerSupabase();
    const { tableName, id } = req.params;
    
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ message: 'Data deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Test koneksi Supabase
export async function handleTestConnection(req: Request, res: Response) {
  try {
    const supabase = createServerSupabase();
    
    // Test dengan query sederhana ke pg_tables
    const { data, error } = await supabase
      .from('pg_tables')
      .select('tablename')
      .limit(1);
    
    if (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Supabase connection successful!',
      tables_available: true
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
"
