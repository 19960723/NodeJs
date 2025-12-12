const { Prisma } = require('@prisma/client');

try {
  // 尝试访问 DMMF
  const dmmf = Prisma.dmmf;
  if (dmmf && dmmf.datamodel) {
    console.log('DMMF is available.');
    const softDeleteModels = dmmf.datamodel.models
      .filter(model => model.fields.some(f => f.name === 'deletedAt'))
      .map(model => model.name);
    console.log('Detected soft delete models:', softDeleteModels);
  } else {
    console.log('DMMF is NOT available directly on Prisma object.');
  }
} catch (e) {
  console.error('Error accessing DMMF:', e);
}

