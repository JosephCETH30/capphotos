export interface PhotoRow {
  id: string;
  user_id: string;
  name: string | null;
  caption: string;
  camera_brand_id: string;
  camera_model_id: string;
  image_path: string;
  created_at: string;
}

export interface DashboardPhoto extends PhotoRow {
  signedUrl: string;
}
