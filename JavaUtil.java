public static File changeExtension(File f, String newExtension) {
  int i = f.getName().lastIndexOf('.');
  String name = f.getName().substring(0,i);
  return new File(f.getParent(), name + newExtension);
}
