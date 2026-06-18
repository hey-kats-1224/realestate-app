import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

// Supabaseのpropertiesテーブルに対するCRUD操作をまとめたカスタムフック
export function useProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 物件一覧を取得（登録日時の降順）
  const fetchProperties = async () => {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setProperties(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // 物件を新規登録する
  const addProperty = async (propertyData) => {
    const { data, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select()
      .single()

    if (error) throw error

    // 先頭に追加してリストを更新
    setProperties((prev) => [data, ...prev])
    return data
  }

  // 既存の物件情報を更新する
  const updateProperty = async (id, propertyData) => {
    const { data, error } = await supabase
      .from('properties')
      .update(propertyData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    setProperties((prev) => prev.map((p) => (p.id === id ? data : p)))
    return data
  }

  // 物件を削除する
  const deleteProperty = async (id) => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) throw error

    setProperties((prev) => prev.filter((p) => p.id !== id))
  }

  return {
    properties,
    loading,
    error,
    addProperty,
    updateProperty,
    deleteProperty,
  }
}
